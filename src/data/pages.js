/** Pages d'information. Le contenu se modifie ici. */

export const INFO_PAGES = {
  faq: {
    title: 'FAQ',
    lead: 'Les questions qu’on nous pose le plus souvent.',
    blocks: [
      { h: 'Combien coûtent vos manteaux ?', p: ['Notre prix de référence est de 50 €. Quelques pièces plus travaillées, comme les fausses fourrures, sont proposées à 60 €. Le prix affiché est toujours le prix payé.'] },
      { h: 'Quelle taille choisir ?', p: ['Nos manteaux se portent volontiers amples. Prenez votre taille habituelle, ou la taille au-dessus pour un tombé plus oversize. Le tableau complet est disponible sur la page Guide des tailles.'] },
      { h: 'Puis-je modifier ma commande ?', p: ['Écrivez-nous le plus vite possible après votre commande : tant qu’elle n’est pas expédiée, nous faisons le nécessaire.'] },
      { h: 'Comment vous contacter ?', p: ['Par e-mail, à bonjour@lecloset.fr. Nous répondons du lundi au vendredi.'] },
    ],
  },
  livraison: {
    title: 'Livraison',
    lead: 'Livraison suivie en France.',
    blocks: [
      { h: 'Suivi de commande', p: ['Chaque commande est expédiée avec un numéro de suivi. Vous le recevez par e-mail dès l’expédition et pouvez suivre votre colis jusqu’à sa livraison.'] },
      { h: 'Préparation', p: ['Les commandes sont préparées les jours ouvrés. Vous recevez une confirmation à chaque étape.'] },
      { h: 'Une question sur votre colis ?', p: ['Écrivez-nous à bonjour@lecloset.fr en précisant votre numéro de commande.'] },
    ],
  },
  retours: {
    title: 'Retours',
    lead: 'Vous disposez de 14 jours pour effectuer un retour.',
    blocks: [
      { h: 'Délai', p: ['Vous disposez de 14 jours à compter de la réception de votre commande pour nous informer de votre souhait de retour.'] },
      { h: 'État de l’article', p: ['L’article doit être retourné complet, non porté et dans son état d’origine, étiquettes attachées.'] },
      { h: 'Comment procéder', p: ['Écrivez-nous à bonjour@lecloset.fr avec votre numéro de commande. Nous vous indiquons la marche à suivre.'] },
    ],
  },
  'politique-de-retours': {
    title: 'Politique de retours',
    lead: 'Le détail de nos conditions de retour.',
    blocks: [
      { h: 'Droit de rétractation', p: ['Conformément au droit français de la vente à distance, vous disposez de 14 jours après réception pour exercer votre droit de rétractation, sans avoir à motiver votre décision.'] },
      { h: 'Remboursement', p: ['Le remboursement intervient après réception et contrôle de l’article retourné, sur le moyen de paiement utilisé lors de la commande.'] },
      { h: 'Frais de retour', p: ['Les modalités de prise en charge des frais de retour sont précisées dans les CGV.'] },
    ],
  },
  'guide-des-tailles': {
    title: 'Guide des tailles',
    lead: 'Mesures indicatives, en centimètres.',
    sizeTable: true,
    blocks: [
      { h: 'Comment mesurer', p: ['Poitrine : à l’endroit le plus fort, bras le long du corps. Taille : au creux, sans serrer.'] },
      { h: 'Entre deux tailles ?', p: ['Prenez votre taille habituelle pour un tombé net, la taille au-dessus pour un effet oversize.'] },
    ],
  },
  contact: {
    title: 'Contact',
    lead: 'Une question ? Écrivez-nous.',
    blocks: [
      { h: 'E-mail', p: ['bonjour@lecloset.fr — nous répondons du lundi au vendredi.'] },
      { h: 'Réseaux', p: ['Retrouvez-nous sur Instagram et TikTok pour les nouveautés et les looks de la saison.'] },
    ],
  },
  'notre-histoire': {
    title: 'Notre histoire',
    lead: 'Le Closet, c’est un dressing entier consacré aux manteaux.',
    blocks: [
      { h: 'Une seule obsession', p: ['Nous ne vendons que des manteaux. Pas de robes, pas d’accessoires : une seule catégorie, travaillée à fond, saison après saison.'] },
      { h: 'Le bon prix', p: ['Un manteau ne devrait pas être un investissement impossible. Notre prix de référence est de 50 € — le même manteau, la même envie, sans le calcul.'] },
      { h: 'Le style avant tout', p: ['Longs, courts, doudounes, fausses fourrures : on sélectionne des pièces qu’on a envie de porter tout l’hiver, et qu’on remarque.'] },
    ],
  },
  'mentions-legales': {
    title: 'Mentions légales',
    lead: 'Informations légales relatives au site lecloset.fr.',
    placeholder: true,
    blocks: [
      { h: 'Éditeur du site', p: ['[À compléter : raison sociale, forme juridique, capital, adresse du siège, RCS, numéro de TVA intracommunautaire.]'] },
      { h: 'Directeur de la publication', p: ['[À compléter : nom du directeur de la publication.]'] },
      { h: 'Hébergeur', p: ['[À compléter : nom, adresse et téléphone de l’hébergeur.]'] },
    ],
  },
  cgv: {
    title: 'Conditions générales de vente',
    lead: 'Les CGV encadrent toute commande passée sur le site.',
    placeholder: true,
    blocks: [
      { h: 'Objet', p: ['[À compléter : champ d’application des présentes conditions générales de vente.]'] },
      { h: 'Prix et paiement', p: ['Les prix sont indiqués en euros toutes taxes comprises. [À compléter : moyens de paiement acceptés et modalités.]'] },
      { h: 'Livraison', p: ['[À compléter : zones desservies, délais indicatifs, frais de port.]'] },
      { h: 'Droit de rétractation', p: ['Vous disposez de 14 jours après réception pour exercer votre droit de rétractation. [À compléter : modalités précises.]'] },
    ],
  },
  confidentialite: {
    title: 'Politique de confidentialité',
    lead: 'Comment vos données sont collectées et utilisées.',
    placeholder: true,
    blocks: [
      { h: 'Données collectées', p: ['[À compléter : catégories de données collectées, finalités et bases légales au sens du RGPD.]'] },
      { h: 'Durée de conservation', p: ['[À compléter : durées de conservation par catégorie de données.]'] },
      { h: 'Vos droits', p: ['Vous disposez d’un droit d’accès, de rectification, d’effacement, d’opposition et de portabilité. [À compléter : adresse de contact du responsable de traitement.]'] },
    ],
  },
};
