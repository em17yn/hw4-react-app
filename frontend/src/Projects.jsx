import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectStatus from './ProjectStatus';

function Projects() {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Project 1', joined: false },
    { id: 2, name: 'Project 2', joined: false },
    { id: 3, name: 'Project 3', joined: false }
  ]);

  const [hardwareQty, setHardwareQty] = useState(10); // shared hardware

  const setProjectJoined = (id, joined) => {
    setProjects((prev) =>
      prev.map((proj) =>
        proj.id === id ? { ...proj, joined } : proj
      )
    );
  };

  const joinedCount = projects.filter((p) => p.joined).length;

  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <h1 style={{ color: '#ff99ac', textAlign: 'center' }}>My Projects</h1>
      <ProjectStatus total={projects.length} joined={joinedCount} />

      {projects.map((proj) => (
        <ProjectCard
          key={proj.id}
          project={proj}
          setProjectJoined={setProjectJoined}
          hardwareQty={hardwareQty}
          setHardwareQty={setHardwareQty}
        />
      ))}
    </div>
  );
}

export default Projects;
