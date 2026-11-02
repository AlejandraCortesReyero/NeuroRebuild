/* Frontend content contract for Daniel's CMS integration.
   This local data file is not a CMS. Publish only approved public material.
   Keep IDs permanent; a record is displayed once and reused by pilot tags. */
window.NEURO_CONTENT = {
  project: { start: '2026-09-01', end: '2029-08-31', timeZone: 'Europe/Madrid' },
  pilots: {
    belfast: {
      name: 'Belfast', country: 'Northern Ireland', latitude: 54.5973, longitude: -5.9301,
      description: 'Belfast connects the shared research to a context of post-conflict reconstruction and socio-economic challenges.',
      context: 'The public project description places Belfast within the exploration of post-conflict and socio-economic reconstruction. Local perspectives inform the shared research approach.',
      image: '../assets/community.jpg', imageAlt: 'People gathering in a public courtyard; illustrative photograph',
      imageCaption: 'People & place / Illustrative photography', partners: []
    },
    kyiv: {
      name: 'Kyiv', country: 'Ukraine', latitude: 50.4501, longitude: 30.5234,
      description: 'Kyiv connects the shared research to the exploration of urban reconstruction in a war-affected context.',
      context: 'The public project description identifies Kyiv as a pilot for exploring reconstruction in a war-affected context. The research brings human experience into the exploration of future urban scenarios.',
      image: '../assets/public-space.jpg', imageAlt: 'People walking through a planted urban space; illustrative photograph',
      imageCaption: 'People & place / Illustrative photography', partners: []
    },
    'la-palma': {
      name: 'La Palma', country: 'Canary Islands, Spain', latitude: 28.68, longitude: -17.85,
      description: 'La Palma connects the shared research to reconstruction following natural disaster in the Canary Islands.',
      context: 'The public project description identifies La Palma as a post-natural-disaster pilot. It contributes a distinct local context to the shared exploration of people-centred reconstruction.',
      image: '../assets/community.jpg', imageAlt: 'Everyday life in a public courtyard; illustrative photograph',
      imageCaption: 'People & place / Illustrative photography', partners: []
    }
  },
  milestones: [
    { id: 'start', date: '2026-09-01', title: 'Project begins', confirmed: true,
      description: 'The three-year project begins on 1 September 2026.',
      url: 'https://cordis.europa.eu/project/id/101308971' },
    { id: 'end', date: '2029-08-31', title: 'Project concludes', confirmed: true,
      description: 'The funded project period is scheduled to conclude on 31 August 2029.',
      url: 'https://cordis.europa.eu/project/id/101308971' }
  ],
  // Add records after approval. See CMS-INTEGRATION.md for all fields.
  news: [],
  events: [],
  resources: []
};
