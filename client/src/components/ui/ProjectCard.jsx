import React, { useState } from 'react'
import { Github,ExternalLink} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Modal from "./Modal";

function ProjectCard(props) {
    const [isOpen, setIsOpen] = useState(false);
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
                className={`rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 ${
                  props.darkMode ? 'bg-slate-800/80 backdrop-blur-sm border border-purple-500/20' : 'bg-white/80 backdrop-blur-sm border border-indigo-200/50'
                }`}
              >
                <div className="relative overflow-hidden">
                  <img  
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                    alt={`${props.project.title} screenshot`}
                   src={`${props.project.image ? import.meta.env.VITE_BACKEND_URL + props.project.image : 'https://images.unsplash.com/photo-1595872018818-97555653a011'}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-purple-400">{props.project.title}</h3>
                  <p className={`mb-4 ${props.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {props.project.description} 
                    <span className="cursor-pointer text-indigo-600 hover:text-indigo-800 underline underline-offset-2 font-medium transition"
 onClick={() => setIsOpen(true)}> more..</span>
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {props.project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
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
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                    <Button
                      onClick={handleProjectCodeClick}
                      variant="outline"
                      size="sm"
                      className={props.darkMode ? 'border-purple-400 text-purple-400 hover:bg-purple-400/10' : 'border-indigo-500 text-indigo-500 hover:bg-indigo-50'}
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

export default ProjectCard