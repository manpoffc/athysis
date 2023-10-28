'use client'
import React from 'react'
import { motion } from 'framer-motion'


function analytics({}: React.FC) {

  const text = "Coming Soon Stay Updated".split(" ");
  return (
    <div className='flex justify-center min-h-screen items-center'>
      
      {
        text.map((ch,i)=>(
          <motion.span
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{
              duration:0.10,
              delay:i/10
            }}
            key={i}
            className='text-3xl text-red-500'
          >
            {ch}{" "}
          </motion.span>
        ))
      }
    </div>
  )
}

export default analytics