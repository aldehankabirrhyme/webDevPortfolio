import path from 'node:path';
import react from '@vitejs/plugin-react';
import { createLogger, defineConfig } from 'vite';

const isDev = process.env.NODE_ENV !== 'production';

// --- DEVELOPMENT TOOLS (Only loaded in dev mode) ---
let inlineEditPlugin, editModeDevPlugin;
if (isDev) {
    try {
        inlineEditPlugin = (await import('./plugins/visual-editor/vite-plugin-react-inline-editor.js')).default;
        editModeDevPlugin = (await import('./plugins/visual-editor/vite-plugin-edit-mode.js')).default;
    } catch (e) {
        console.warn("Dev plugins not found, skipping...");
    }
}

// Error Handling Scripts (Keeping them in strings to inject via plugin)
const configHorizonsRuntimeErrorHandler = `window.onerror = (m, s, l, c, e) => { /* logic */ };`; 
// ... (আপনার আগের সব এরর হ্যান্ডলার স্ক্রিপ্ট এখানে থাকবে)

const addTransformIndexHtml = {
    name: 'add-transform-index-html',
    transformIndexHtml(html) {
        // প্রোডাকশনে এই ইনজেকশনগুলো বাদ দেওয়া ভালো, যদি না আপনার কোনো স্পেশাল ট্র্যাকিং দরকার হয়
        if (!isDev) return html; 
        
        return {
            html,
            tags: [
                { tag: 'script', attrs: { type: 'module' }, children: "/* error handlers */", injectTo: 'head' },
                // আপনার অন্যান্য স্ক্রিপ্টগুলো এখানে থাকবে...
            ],
        };
    },
};

// --- LOGGER CONFIGURATION ---
const logger = createLogger();
const loggerError = logger.error;
logger.error = (msg, options) => {
    if (options?.error?.toString().includes('CssSyntaxError: [postcss]')) return;
    loggerError(msg, options);
};

// --- VITE CONFIGURATION ---
export default defineConfig({
    customLogger: logger,
    plugins: [
        react(),
        ...(isDev ? [
            inlineEditPlugin?.(), 
            editModeDevPlugin?.(), 
            addTransformIndexHtml
        ] : [])
    ],
    
    // প্রোডাকশনে বেস পাথ ঠিক রাখা জরুরি (যদি সাবফোল্ডারে হোস্ট করেন)
    base: '/', 

    resolve: {
        extensions: ['.jsx', '.js', '.tsx', '.ts', '.json'],
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },

    // প্রোডাকশন সার্ভার কনফিগ (Nginx/Vercel handles this usually, but good for local preview)
    server: {
        cors: true,
        headers: {
            'Cross-Origin-Embedder-Policy': 'credentialless',
        },
        allowedHosts: isDev, // প্রোডাকশনে এটি নির্দিষ্ট ডোমেইন হওয়া উচিত
    },

    build: {
        outDir: 'dist',
        minify: 'terser', // কোড কম্প্রেস করার জন্য
        sourcemap: isDev, // প্রোডাকশনে সোর্স ম্যাপ বন্ধ রাখা সিকিউর
        cssCodeSplit: true,
        chunkSizeWarningLimit: 1000,
        
        rollupOptions: {
            // প্রোডাকশনে এক্সটার্নাল লাইব্রেরিগুলো হ্যান্ডেল করা
            external: isDev ? [
                '@babel/parser',
                '@babel/traverse',
                '@babel/generator',
                '@babel/types'
            ] : [],
            
            output: {
                // ম্যানুয়াল চাঙ্কিং: বড় লাইব্রেরিগুলোকে আলাদা ফাইলে ভাগ করা (পারফরম্যান্স বাড়াবে)
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('react')) return 'vendor-react';
                        if (id.includes('lucide-react')) return 'vendor-icons';
                        if (id.includes('framer-motion')) return 'vendor-animation';
                        return 'vendor'; 
                    }
                },
                // ফাইল নেম ফরম্যাট (ক্যাশিং এর জন্য ভালো)
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
            }
        },
        
        // Terser অপ্টিমাইজেশন (console logs রিমুভ করা)
        terserOptions: {
            compress: {
                drop_console: !isDev, // প্রোডাকশনে সব console.log মুছে যাবে
                drop_debugger: true,
            },
        },
    },
});