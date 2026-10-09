// Edit this array to add or update announcements. Dates use YYYY-MM-DD.
// Newest dates appear first; entries on the same day keep their order.
// A simple entry needs only date and text. The fields below are optional:
// title, conferenceUrl, inlineLinks, papers, resources.
// Each paper may have title, text, inlineLinks, reference, doi, and resources.
// Resources use { label: "Slides (PDF)", url: "https://..." }.
// All text is plain text; HTML is not needed. See MAINTENANCE.md for examples.

window.PROFILE_NEWS = [
  {
    date: "2026-10-07",
    title: "arXiv · New preprint",
    text: "Our preprint is now available on arXiv. First submitted October 7, 2026.",
    papers: [
      {
        title: "A sharp minimum for cube-apex bodies in every dimension",
        text: "Coauthored with Pavel B. Dubovski.",
        reference: "arXiv:2610.11014 [math.MG]",
        resources: [
          { label: "arXiv preprint", url: "https://arxiv.org/abs/2610.11014" },
          { label: "Lean 4 formalization and code", url: "https://github.com/Henry-Hanyue-Shen/A-sharp-minimum-for-cube-apex-bodies-in-every-dimension" }
        ]
      }
    ]
  },
  {
    date: "2026-10-06",
    title: "IMDC 2027 · Abstract acceptance",
    text: "Our abstract was accepted for further development into a full paper for the International Marine Design Conference (IMDC) 2027. We were invited to submit the draft full paper.",
    papers: [
      {
        title: "Fixed-Prototype Spatial Voting for Visual Sea-State Classification",
        text: "Coauthored with Xinling Liao (Lfff09) and Raju Datla (Stevens Institute of Technology).",
        inlineLinks: [
          { text: "Lfff09", url: "https://github.com/Lfff09" },
          { text: "Raju Datla", url: "https://www.stevens.edu/profile/rdatla" }
        ],
        reference: "Abstract ID: IMDC-2027-161",
        resources: [
          { label: "Conference and submission information", url: "https://sites.mit.edu/imdc/abstract-paper-presentation-info/" }
        ]
      }
    ]
  },
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
    date: "2026-07-01",
    title: "IEEE OCEANS 2026 Monterey · Paper acceptances",
    conferenceUrl: "https://controls.papercept.net/conferences/conferences/OCEANS26B/program/OCEANS26B_ContentListWeb_4.html#thc6_04",
    text: "Three coauthored papers were accepted to IEEE OCEANS 2026 Monterey. They were not presented at the conference. The date follows the official author-notification schedule.",
    inlineLinks: [{ text: "official author-notification schedule", url: "https://monterey26.oceansconference.org/important-dates/" }],
    papers: [
      {
        title: "Physics-Regularized Sea State Classification on an 8-Bit Microcontroller",
        text: "Xinling Liao (Lfff09), Yuyan Lin, and Henry Shen.",
        inlineLinks: [{ text: "Lfff09", url: "https://github.com/Lfff09" }],
        reference: "OCEANS26B-0157",
        resources: [
          { label: "Official program entry", url: "https://controls.papercept.net/conferences/conferences/OCEANS26B/program/OCEANS26B_ContentListWeb_4.html#thc6_04" }
        ]
      },
      {
        title: "An Analytic Acoustic Evaluation of Cavitator Geometries for Supercavitating Vehicles",
        text: "Ruoyu Zhang, Xinjia Zhang, and Henry Shen.",
        reference: "OCEANS26B-0162",
        resources: [
          { label: "Official program entry", url: "https://controls.papercept.net/conferences/conferences/OCEANS26B/program/OCEANS26B_ContentListWeb_4.html#thb5_04" }
        ]
      },
      {
        title: "Physics-Regularized ConvLSTM for Long-Lead ENSO Prediction from ERSSTv5",
        text: "Jiayi Hao, Ziyi Weng, and Henry Shen.",
        reference: "OCEANS26B-0164",
        resources: [
          { label: "Official program entry", url: "https://controls.papercept.net/conferences/conferences/OCEANS26B/program/OCEANS26B_ContentListWeb_4.html#thb9_01" }
        ]
      }
    ]
  },
  {
    date: "2026-06-23",
    title: "ASME IMECE 2026 · Two paper acceptances",
    text: "Two papers accepted in the Technical Paper Publication category; both pending publication. The date follows ASME’s scheduled draft-paper decision notification.",
    inlineLinks: [{ text: "scheduled draft-paper decision notification", url: "https://imece.secure-platform.com/a/page/publication_schedule" }],
    papers: [
      {
        title: "Complex Spectral Binding Networks for High-Entropy Fluid Dynamics: Solving the Spectral Fidelity Paradox in Atmospheric Gravity Waves",
        text: "Presentation scheduled for November 11, 2026, at 14:21 in Vancouver, Canada (local time).",
        reference: "IMECE2026-192090",
        resources: [
          { label: "ASME paper record", url: "https://imece.secure-platform.com/a/solicitations/281/sessiongallery/24780/application/192090" },
          { label: "Conference session", url: "https://imece.secure-platform.com/a/solicitations/281/sessiongallery/24780" }
        ]
      },
      {
        title: "A Speed-Gradient Operator for Asymptotic Static State Recovery in Unsteady Viscous Flows",
        text: "Presentation scheduled for November 11, 2026, at 14:42 in Vancouver, Canada (local time).",
        reference: "IMECE2026-192091",
        resources: [
          { label: "ASME paper record", url: "https://imece.secure-platform.com/a/solicitations/281/sessiongallery/24781/application/192091" },
          { label: "Conference session", url: "https://imece.secure-platform.com/a/solicitations/281/sessiongallery/24781" }
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
