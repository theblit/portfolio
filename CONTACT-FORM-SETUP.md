# Réception des messages du formulaire de contact

Pour recevoir les messages envoyés via "Send Message" sur ton adresse **kolawolechristianpatherne@gmail.com**, le formulaire utilise [Formspree](https://formspree.io).

## Étapes

1. Va sur **https://formspree.io** et crée un compte (gratuit).
2. Clique sur **"New Form"** et associe ton email : **kolawolechristianpatherne@gmail.com**.
3. Formspree te donne une URL du type : `https://formspree.io/f/xyzabc12`.
4. Dans le projet, ouvre **`src/app/home/components/contact/contact.html`**.
5. Remplace **`YOUR_FORM_ID`** dans l’URL du formulaire par la partie **ID** de ton URL Formspree.

   Par exemple, si ton URL est `https://formspree.io/f/mabcd123`, remplace par :
   ```html
   <form action="https://formspree.io/f/mabcd123" method="POST" id="contact-form">
   ```

Après ça, chaque envoi depuis "Send Message" t’arrivera par email sur kolawolechristianpatherne@gmail.com.
