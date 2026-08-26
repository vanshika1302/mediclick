import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { IS_STATIC_BUILD } from '../config';

// Shown only on the statically-built (no-backend) deploy - see config.js.
// Purely additive: it renders nothing (returns null) in normal local
// development, where the real login/signup/booking flows keep working
// against the real API exactly as before.
export default function DemoBanner() {
  if (!IS_STATIC_BUILD) {
    return null;
  }

  return (
    <Alert
      severity="info"
      variant="filled"
      square
      action={
        <Button
          component={RouterLink}
          to="/demo"
          color="inherit"
          size="small"
          style={{ fontWeight: 700, whiteSpace: 'nowrap' }}
        >
          OPEN DEMO DASHBOARD
        </Button>
      }
      style={{ justifyContent: 'center', alignItems: 'center' }}
    >
      This is a static demo build with no live backend, so sign-in, sign-up, and
      booking can&rsquo;t reach a real API here &mdash; see the Demo Dashboard for a
      working preview with sample data.
    </Alert>
  );
}
