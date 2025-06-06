export const sendEmail = async (to, subject, text) => {
    try {
      const response = await fetch('/mail/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to, subject, text }),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi de l\'email');
      }
      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };