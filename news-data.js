// Edit this array to add or update announcements. Dates use YYYY-MM-DD.
// Newest dates appear first; entries on the same day keep their order.
// A simple entry needs only date and text. The fields below are optional:
// title, conferenceUrl, inlineLinks, papers, resources.
// Each paper may have title, text, inlineLinks, reference, doi, and resources.
// Resources use { label: "Slides (PDF)", url: "https://..." }.
// All text is plain text; HTML is not needed. See MAINTENANCE.md for examples.

window.PROFILE_NEWS = [
  {
    date: "2026-10-01",
    title: "AGU26 · Online poster acceptance",
    text: "Our abstract was accepted for an online poster presentation. Notification received October 1, 2026.",
    papers: [
      {
        title: "Probabilistic Atmospheric Model for Cloud Field Prediction",
        text: "Coauthored with Xinling Liao (Lfff09).",
        inlineLinks: [{ text: "Lfff09", url: "https://github.com/Lfff09" }],
        resources: [
          { label: "AGU invitation letter (PDF)", url: "https://henry-hanyue-shen.github.io/assets/agu26-invitation-2070697.pdf" }
        ]
      }
    ]
  },
  {
    date: "2026-07-29",
    title: "ASME FEDSM 2026",
    conferenceUrl: "https://fedsm.secure-platform.com/a/solicitations/278/sessiongallery/23903",
    text: "Presented in Bellevue, WA. Accepted in the Technical Paper Publication category; pending publication.",
    papers: [
      {
        title: "One Wing for Two Worlds: A Bio-Inspired Design for Cross-Domain Vehicles",
        reference: "FEDSM2026-184505",
        resources: [
          { label: "ASME paper record", url: "https://fedsm.secure-platform.com/a/solicitations/278/sessiongallery/23903/application/184505" },
          { label: "Presentation slides (PDF)", url: "https://github.com/Henry-Hanyue-Shen/Works_And_Presentations/blob/main/FEDSM26/FEDSM-26_184505_PPT.pdf" }
        ]
      }
    ]
  },
  {
    date: "2026-07-27",
    title: "ASME FEDSM 2026",
    conferenceUrl: "https://fedsm.secure-platform.com/a/solicitations/278/sessiongallery/23874",
    text: "Presented in Bellevue, WA. Accepted in the Technical Paper Publication category; pending publication.",
    papers: [
      {
        title: "Residual Manifolds and Cloud Uncertainty: A Unified Framework for Physical System Prediction Validated in Aerodynamic Coefficient Prediction",
        reference: "FEDSM2026-184498",
        resources: [
          { label: "ASME paper record", url: "https://fedsm.secure-platform.com/a/solicitations/278/sessiongallery/23874/application/184498" },
          { label: "Presentation slides (PDF)", url: "https://github.com/Henry-Hanyue-Shen/Works_And_Presentations/blob/main/FEDSM26/FEDSM-26_184498_PPT.pdf" }
        ]
      }
    ]
  },
  {
    date: "2026-05-27",
    title: "IEEE OCEANS 2026 Sanya",
    conferenceUrl: "https://program-sanya26.oceanstechnical.org/glance.cfm#:~:text=The%20Critical%20Maneuverability%20Theorem",
    text: "Presented in the Hydrodynamics 1 session in Sanya, China. Published in the conference proceedings.",
    papers: [
      {
        title: "The Critical Maneuverability Theorem: A First-Principles Design Framework for Agile Supercavitating Vehicles",
        doi: "10.1109/OCEANS66983.2026.11617166",
        resources: [
          { label: "IEEE Xplore paper", url: "https://ieeexplore.ieee.org/document/11617166/" },
          { label: "Presentation slides (PDF)", url: "https://github.com/Henry-Hanyue-Shen/Works_And_Presentations/blob/main/OCEANS26A/OCEANS_SANYA_Hydrodynamics1_HenryShen.pdf" },
          { label: "Citation erratum (author-maintained)", url: "https://github.com/Henry-Hanyue-Shen/Works_And_Presentations/blob/main/OCEANS26A/Citation_Erratum_20260924" }
        ]
      }
    ]
  }
];
