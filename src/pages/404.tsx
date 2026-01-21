import { Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();
  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h4" sx={{ mb: 4 }}>
        404 - Não encontrado
      </Typography>
      <Button onClick={() => router.back()}>&lt;- Voltar</Button>
    </Container>
  );
}
