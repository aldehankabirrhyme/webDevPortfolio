/* --------------------- seed.js --------------------- */
// A small script to create your profile, skills and projects from the provided data.
// Run: node seed.js   (make sure MONGO_URI & JWT_SECRET are set in .env)

const mongoose5 = require('mongoose');
require('dotenv').config();
const User3 = require('./models/User');
const Project4 = require('./models/Project');
const Skill4 = require('./models/Skill');

const data = {
  proFileImsageSrc: 'https://images.unsplash.com/photo-1551437288-dce670e4d1e6',
  name: 'Md Aldehan Kabir Rhyme',
  profession: 'Full Stack Web Developer & Programmer',
  bioDetails: "I specialize in building modern, responsive web applications and WordPress websites. With over 7 years of experience, I have worked on a wide range of technologies including HTML, CSS (Bootstrap, Tailwind), JavaScript (React, React Native, Node.js, Express), MongoDB, PHP, and WordPress. I'm also proficient in Python, Java, and C++.",
  aboutME: {
    Starting: 'I discovered my passion for programming at the age of 12, when I wrote my first "Hello World" program. What started as curiosity quickly became an obsession with creating digital solutions that make a real impact.',
    ProfessionalMilestone: 'One of my proudest achievements was collaborating with the VP of Sales at Squarespace to launch a successful digital marketing campaign. This experience taught me the importance of combining technical expertise with business strategy.',
    Today: 'With over 7 years of experience, I continue to push the boundaries of what\'s possible on the web. I\'m passionate about creating user-centric applications that solve real-world problems and deliver exceptional experiences.'
  },
  aboutMeCoverImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12',
  Email: 'aldehan2500@gmail.com',
  phoneNumber: '+88 (018) 6870 0109',
  addressDetails: 'Dhaka 1200, Bangladesh',
  guitHubLink: '#',
  LinkedinLink: '#',
  resumelink: '#',
  FBlink: '#',
  projects: [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB',
      projectDescription: 'This project is a React-based web application for managing tasks. It features a clean and intuitive user interface, persistent data storage using local storage, and full responsiveness for mobile and desktop devices. It utilizes Tailwind CSS for styling and is optimized for performance.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
      image: 'Modern e-commerce website with shopping cart and product gallery',
      src: '#',
      codeSrc: '#'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates',
      projectDescription: 'This project is a React-based web application for managing tasks. It features a clean and intuitive user interface, persistent data storage using local storage, and full responsiveness for mobile and desktop devices. It utilizes Tailwind CSS for styling and is optimized for performance.',
      technologies: ['React', 'Firebase', 'Material-UI', 'JavaScript'],
      image: 'Clean task management interface with kanban board',
      src: '#',
      codeSrc: '#'
    },
    {
      title: 'WordPress Business Site',
      description: 'Custom WordPress theme for a digital marketing agency',
      projectDescription: 'This project is a React-based web application for managing tasks. It features a clean and intuitive user interface, persistent data storage using local storage, and full responsiveness for mobile and desktop devices. It utilizes Tailwind CSS for styling and is optimized for performance.',
      technologies: ['WordPress', 'PHP', 'CSS', 'JavaScript', 'MySQL'],
      image: 'Professional business website with modern design',
      src: '#',
      codeSrc: '#'
    },
    {
      title: 'Mobile Banking App',
      description: 'React Native mobile application for banking services',
      projectDescription: 'This project is a React-based web application for managing tasks. It features a clean and intuitive user interface, persistent data storage using local storage, and full responsiveness for mobile and desktop devices. It utilizes Tailwind CSS for styling and is optimized for performance.',
      technologies: ['React Native', 'Redux', 'Node.js', 'PostgreSQL'],
      image: 'Mobile banking app interface with transaction history',
      src: '#',
      codeSrc: '#'
    },
    {
      title: 'Data Analytics Dashboard',
      description: 'Interactive dashboard for business intelligence and analytics',
      projectDescription: 'This project is a React-based web application for managing tasks. It features a clean and intuitive user interface, persistent data storage using local storage, and full responsiveness for mobile and desktop devices. It utilizes Tailwind CSS for styling and is optimized for performance.',
      technologies: ['Python', 'Django', 'Chart.js', 'PostgreSQL'],
      image: 'Analytics dashboard with charts and data visualizations',
      src: '#',
      codeSrc: '#'
    },
    {
      title: 'Real Estate Platform',
      description: 'Property listing and management system with advanced search',
      projectDescription: 'This project is a React-based web application for managing tasks. It features a clean and intuitive user interface, persistent data storage using local storage, and full responsiveness for mobile and desktop devices. It utilizes Tailwind CSS for styling and is optimized for performance.',
      technologies: ['React', 'Express', 'MongoDB', 'Google Maps API'],
      image: 'Real estate website with property listings and map view',
      src: '#',
      codeSrc: '#'
    }
  ],
  skills: [
    { category: 'Frontend', iconName: 'Code', items: ['HTML', 'CSS', 'Bootstrap', 'Tailwind CSS', 'JavaScript', 'React', 'jQuery'] },
    { category: 'Backend', iconName: 'Server', items: ['Node.js', 'Express', 'PHP', 'Python', 'Java', 'C++'] },
    { category: 'Database', iconName: 'Database', items: ['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase'] },
    { category: 'Mobile', iconName: 'Smartphone', items: ['React Native', 'Mobile-First Design', 'Progressive Web Apps'] },
    { category: 'CMS', iconName: 'Globe', items: ['WordPress', 'Custom Themes', 'Plugin Development'] },
    { category: 'Tools', iconName: 'Cpu', items: ['Git', 'Docker', 'AWS', 'Heroku', 'Netlify', 'Vercel'] }
  ]
};

async function seed() {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';
  await mongoose5.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected for seeding');

  // find or create user by email
  let user = await User3.findOne({ email: data.Email });
  if (!user) {
    user = new User3({
      name: data.name,
      email: data.Email,
      profileImageSrc: data.proFileImsageSrc,
      profession: data.profession,
      bioDetails: data.bioDetails,
      aboutME: data.aboutME,
      aboutMeCoverImage: data.aboutMeCoverImage,
      Email: data.Email,
      phoneNumber: data.phoneNumber,
      addressDetails: data.addressDetails,
      githubLink: data.guitHubLink,
      linkedinLink: data.LinkedinLink,
      resumelink: data.resumelink,
      fbLink: data.FBlink,
    });
    // set a default password so you can login after seeding: 'password123'
    const bcrypt2 = require('bcryptjs');
    user.passwordHash = await bcrypt2.hash('password123', 10);
    console.log('Updated passwordHash', user.passwordHash);
    await user.save();
    console.log('Created user:', user.email, 'with default password: password123');
  } else {
    // update profile fields
    user.profileImageSrc = data.proFileImsageSrc;
    user.name = data.name;
    user.profession = data.profession;
    user.bioDetails = data.bioDetails;
    user.aboutME = data.aboutME;
    user.aboutMeCoverImage = data.aboutMeCoverImage;
    user.phoneNumber = data.phoneNumber;
    user.addressDetails = data.addressDetails;
    user.githubLink = data.guitHubLink;
    user.linkedinLink = data.LinkedinLink;
    user.resumelink = data.resumelink;
    user.fbLink = data.FBlink;
    const bcrypt2 = require('bcryptjs');
    user.passwordHash = await bcrypt2.hash('password123', 10);
    console.log('Updated passwordHash', user.passwordHash);
    await user.save();
    console.log('Updated existing user:', user.email);
  }

  // wipe old projects & skills for this user and insert fresh ones
  await Project4.deleteMany({ user: user._id });
  await Skill4.deleteMany({ user: user._id });

  for (const p of data.projects) {
    const proj = new Project4({
      user: user._id,
      title: p.title,
      description: p.description,
      projectDescription: p.projectDescription,
      technologies: p.technologies,
      image: p.image,
    });
    await proj.save();
  }

  for (const s of data.skills) {
    const skill = new Skill4({
      user: user._id,
      category: s.category,
      iconName: s.iconName,
      items: s.items,
    });
    await skill.save();
  }

  console.log('Seed complete');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});


