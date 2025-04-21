import React from 'react';

function ProjectStatus({ total, joined }) {
  return (
    <div
      style={{
        backgroundColor: '#fff',
        border: '2px solid #ffc1cc',
        borderRadius: '12px',
        padding: '1rem',
        marginBottom: '1rem',
        textAlign: 'center'
      }}
    >
      <p style={{ color: '#f47c7c', margin: 0 }}>
        You have joined {joined} out of {total} projects.
      </p>
    </div>
  );
}

export default ProjectStatus;
