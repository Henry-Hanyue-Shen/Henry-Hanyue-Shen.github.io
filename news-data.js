// Edit this array to add or update announcements. Dates use YYYY-MM.
// Newest months appear first; entries in the same month keep their order.
// A simple entry needs only date and text. The fields below are optional:
// title, conferenceUrl, inlineLinks, papers, resources.
// Each paper may have title, text, inlineLinks, reference, doi, and resources.
// Resources use { label: "Slides (PDF)", url: "https://..." }.
// All text is plain text; HTML is not needed. See MAINTENANCE.md for examples.

window.PROFILE_NEWS = [
  {
    date: "2026-10",
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
    date: "2026-07",
    title: "ASME FEDSM 2026",
    conferenceUrl: "https://event.asme.org/FEDSM",
    text: "Presented July 26–29 in Bellevue, WA. Both papers were accepted in the Technical Paper Publication category and are pending publication.",
    papers: [
      {
        title: "Residual Manifolds and Cloud Uncertainty: A Unified Framework for Physical System Prediction Validated in Aerodynamic Coefficient Prediction",
        reference: "FEDSM2026-184498",
        resources: [
          { label: "ASME paper record", url: "https://fedsm.secure-platform.com/a/solicitations/278/sessiongallery/23874/application/184498" },
          { label: "Presentation slides (PDF)", url: "https://github.com/Henry-Hanyue-Shen/Works_And_Presentations/blob/main/FEDSM26/FEDSM-26_184498_PPT.pdf" }
        ]
      },
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
    date: "2026-05",
    title: "IEEE OCEANS 2026 Sanya",
    conferenceUrl: "https://sanya26.oceansconference.org/",
    text: "Presented in the technical program, May 25–28 in Sanya, China. Published in the conference proceedings.",
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
