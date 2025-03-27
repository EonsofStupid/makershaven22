
import React from 'react';
import { motion } from 'framer-motion';
import { ListItem } from '../ListItem';
import { menuVariants } from '../animations';

export const BlogMenu = () => (
  <motion.ul
    variants={menuVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="grid w-[400px] gap-3 p-4 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl"
  >
    <ListItem href="/blog" title="Latest Articles">
      Read our latest updates and feature articles
    </ListItem>
    <ListItem href="/blog/tutorials" title="Tutorials">
      Step-by-step guides for makers and builders
    </ListItem>
    <ListItem href="/blog/community" title="Community Spotlights">
      Highlighting projects and achievements from our community
    </ListItem>
  </motion.ul>
);
