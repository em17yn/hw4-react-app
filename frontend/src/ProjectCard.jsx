import React, { useState } from 'react';
import { Card, CardContent, Button, TextField } from '@mui/material';

function ProjectCard({ project, setProjectJoined, hardwareQty, setHardwareQty }) {
  const [message, setMessage] = useState('');
  const [qtyInput, setQtyInput] = useState(1);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleJoin = async () => {
    try {
      const endpoint = project.joined ? 'leave' : 'join';
      const res = await fetch(`/${endpoint}?projectId=${project.id}`);
      const data = await res.json();
      showMessage(data.message);
      setProjectJoined(project.id, !project.joined);
    } catch (err) {
      showMessage('Error connecting to server');
    }
  };

  const handleCheckIn = async () => {
    try {
      const res = await fetch(`/checkin?projectId=${project.id}&qty=${qtyInput}`);
      const data = await res.json();
      showMessage(data.message);
      setHardwareQty(hardwareQty + Number(qtyInput));
    } catch (err) {
      showMessage('Check-in failed');
    }
  };

  const handleCheckOut = async () => {
    if (qtyInput > hardwareQty) {
      showMessage(`Not enough hardware. Only ${hardwareQty} available.`);
      return;
    }

    try {
      const res = await fetch(`/checkout?projectId=${project.id}&qty=${qtyInput}`);
      const data = await res.json();
      showMessage(data.message);
      setHardwareQty(hardwareQty - Number(qtyInput));
    } catch (err) {
      showMessage('Check-out failed');
    }
  };

  const buttonStyle = {
    backgroundColor: '#ffb3c1',
    marginRight: '0.5rem',
    '&:hover': {
      backgroundColor: '#ff9fb2'
    }
  };

  return (
    <Card sx={{ margin: '1rem 0', border: '2px solid #ffc1cc', borderRadius: '12px' }}>
      <CardContent>
        <h2 style={{ color: '#f47c7c', marginBottom: '0.5rem' }}>{project.name}</h2>
        <p style={{ marginBottom: '1rem' }}>
          {project.joined
            ? 'You have joined this project.'
            : 'You are not joined yet.'}
        </p>
        <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
          Shared hardware available: <strong>{hardwareQty}</strong>
        </p>

        <TextField
          type="number"
          label="Qty"
          size="small"
          inputProps={{ min: 1 }}
          value={qtyInput}
          onChange={(e) => setQtyInput(Math.max(1, Number(e.target.value)))}
          sx={{ marginBottom: '1rem', marginRight: '0.5rem', width: '80px' }}
        />

        <div style={{ marginBottom: '1rem' }}>
          <Button
            variant="contained"
            onClick={handleJoin}
            sx={{
              backgroundColor: project.joined ? '#ff99ac' : '#ffb3c1',
              marginRight: '0.5rem',
              '&:hover': {
                backgroundColor: project.joined ? '#ff748c' : '#ff9fb2'
              }
            }}
          >
            {project.joined ? 'Leave Project' : 'Join Project'}
          </Button>
          <Button variant="contained" onClick={handleCheckOut} sx={buttonStyle}>
            Check Out
          </Button>
          <Button variant="contained" onClick={handleCheckIn} sx={buttonStyle}>
            Check In
          </Button>
        </div>

        {message && (
          <p style={{ color: '#888', fontStyle: 'italic', fontSize: '0.9rem' }}>{message}</p>
        )}
      </CardContent>
    </Card>
  );
}

export default ProjectCard;
