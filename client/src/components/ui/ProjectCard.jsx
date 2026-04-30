import React, { useState } from 'react'
import { Github, ExternalLink, EyeOff } from 'lucide-react'; // EyeOff আইকন যোগ করা হয়েছে
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Modal from "./Modal";

function ProjectCard(props) {
    const [isOpen, setIsOpen] = useState(false);

    // ১. যদি প্রজেক্টের isVisible false থাকে, তবে রেন্ডার হবে না 
    // (নোট: যদি আপনি অ্যাডমিন ড্যাশবোর্ডে থাকেন তবে এটি রেন্ডার করা উচিত, 
    // কিন্তু পাবলিক পোর্টফোলিওতে এটি নিচের মতো ফিল্টার করা উচিত)
    if (props.project?.isVisible === false) {
        return null; 
    }

    const handleProjectSrcClick = () => {
        if (props.project?.src) {
          window.open(props.project.src, '_blank');
        } else {
          alert('Project link is not available.');
        }
    };

    const handleProjectCodeClick = () => {
        if (props.project?.codeSrc) {
          window.open(props.project.codeSrc, '_blank');
        } else {
          alert('Project code link is not available.');
        }
    };

    return (
        <>
            <motion.div
                key={props.index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: props.index * 0.1 }}
                viewport={{ once: true }}
                className={`relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 ${
                  props.darkMode ? 'bg-slate-800/80 backdrop-blur-sm border border-purple-500/20' : 'bg-white/80 backdrop-blur-sm border border-indigo-200/50'
                }`}
              >
                {/* ২. ভিজিবিলিটি স্ট্যাটাস ব্যাজ (ঐচ্ছিক - শুধু ড্যাশবোর্ডের জন্য কাজে লাগে) */}
                {props.project.isVisible === false && (
                    <div className="absolute top-2 right-2 z-10 bg-red-500/80 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
                        <EyeOff size={12} /> Hidden
                    </div>
                )}

                <div className="relative overflow-hidden">
                  <img  
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                    alt={`${props.project.title} screenshot`}
                    src={`${props.project.image ? import.meta.env.VITE_BACKEND_URL + props.project.image : 'https://images.unsplash.com/photo-1595872018818-97555653a011'}`} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-purple-400">{props.project.title}</h3>
                  <p className={`mb-4 text-sm line-clamp-3 ${props.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {props.project.description} 
                    <span className="cursor-pointer text-indigo-600 hover:text-indigo-800 underline underline-offset-2 font-medium transition ml-1"
                      onClick={() => setIsOpen(true)}> more..</span>
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {/* ৩. টেকনোলজি লুপে ডিফেন্সিভ চেক (tech null হলে ক্রাশ করবে না) */}
                    {props.project.technologies?.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          props.darkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-indigo-100 text-indigo-700'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <Button
                      onClick={handleProjectSrcClick}
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                    <Button
                      onClick={handleProjectCodeClick}
                      variant="outline"
                      size="sm"
                      className={`flex-1 ${props.darkMode ? 'border-purple-400 text-purple-400 hover:bg-purple-400/10' : 'border-indigo-500 text-indigo-500 hover:bg-indigo-50'}`}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  </div>
                </div>
            </motion.div>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                description={props.project.projectDescription}
                darkMode={props.darkMode}
            />
        </>
    )
}

export default ProjectCard;