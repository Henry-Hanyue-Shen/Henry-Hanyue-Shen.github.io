// Edit this array to add or update announcements. Dates use YYYY-MM-DD.
// Entries are sorted by date; the timeline runs left (earlier) to right (latest).
// A simple entry needs only date and text. The fields below are optional:
// title, conferenceUrl, inlineLinks, papers, resources, accepted.
// Set accepted: true to show the green acceptance marker on the timeline.
// Set scheduled: true for a future official decision date (shown dashed).
// Submission dates use the official submission deadline; acceptance dates use
// the official notification date.
// Each paper may have title, text, inlineLinks, reference, doi, and resources.
// Resources use { label: "Slides (PDF)", url: "https://..." }.
// All text is plain text; HTML is not needed. See MAINTENANCE.md for examples.

window.PROFILE_NEWS = [
  {
    date: "2026-11-04",
    accepted: true,
    title: "IEEE BigData 2026 · CONSTRAINT workshop paper acceptance",
    conferenceUrl: "https://lc4workshop.github.io/constraint.html",
    text: "Accepted to the 4th Workshop on Handling Resource Constraints for/using Big Data and AI (CONSTRAINT 2026), held online with IEEE BigData 2026 on December 14–17, 2026. The date follows the workshop’s official notification date.",
    papers: [
      {
        title: "Precision-Preserving Subtensor Inference for a 22B Joint Audio–Video Generator under a Fixed GPU Working Set",
        text: "Coauthored with Xinling Liao (Lfff09).",
        inlineLinks: [{ text: "Lfff09", url: "https://github.com/Lfff09" }]
      }
    ]
  },
  {
    date: "2026-11-01",
    title: "JGR: Atmospheres · Submission and ESS Open Archive preprint",
    text: "Our manuscript is in submission to JGR: Atmospheres; the preprint was posted on ESS Open Archive on November 1, 2026. It extends the work behind our AGU26 abstract.",
    papers: [
      {
        title: "Spatial Fusion of Himawari Observations and GFS Guidance for 24–72-Hour Regional Cloud-Probability Forecasting",
        text: "Xinling Liao (Lfff09) and Hanyue Shen.",
        inlineLinks: [{ text: "Lfff09", url: "https://github.com/Lfff09" }],
        doi: "10.22541/essoar.15011397/v1",
        resources: [
          { label: "ESS Open Archive preprint", url: "https://essopenarchive.org/doi/full/10.22541/essoar.15011397/v1" }
        ]
      }
    ]
  },
  {
    date: "2026-10-30",
    title: "MLSys 2027 · Submission and arXiv preprint",
    text: "Submitted to MLSys 2027 and posted on arXiv on October 30, 2026. Under peer review.",
    papers: [
      {
        title: "Autoformalization for Ambiguous Inputs: Precision, Coverage, and Cost across SQL and Logical Forms",
        text: "Coauthored with Xinling Liao (Lfff09), Adarsh Vatsa, and William Eiers (Neurosymbolic Software Engineering Laboratory, Stevens Institute of Technology).",
        inlineLinks: [{ text: "Lfff09", url: "https://github.com/Lfff09" }],
        reference: "arXiv:2611.00340 [cs.SE]",
        resources: [
          { label: "arXiv preprint", url: "https://arxiv.org/abs/2611.00340" }
        ]
      }
    ]
  },
  {
    date: "2026-10-12",
    title: "EMO 2027 · Paper submission",
    conferenceUrl: "https://www.emo2027.org/",
    text: "Submitted a paper to the International Conference on Evolutionary Multi-Criterion Optimization (EMO 2027), from MA-498 senior research with Pavel B. Dubovski on error bounds for estimating global minimum values from piecewise spline fits to discrete data. Under review. The date follows the official (extended) submission deadline.",
    inlineLinks: [{ text: "Pavel B. Dubovski", url: "https://www.stevens.edu/profile/pdubovsk" }]
  },
  {
    date: "2026-10-07",
    title: "arXiv · New preprint",
    text: "Our preprint is now available on arXiv. First submitted October 7, 2026.",
    papers: [
      {
        title: "A sharp minimum for cube-apex bodies in every dimension",
        text: "Coauthored with Pavel B. Dubovski.",
        inlineLinks: [{ text: "Pavel B. Dubovski", url: "https://www.stevens.edu/profile/pdubovsk" }],
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
    accepted: true,
    title: "IMDC 2027 · Abstract acceptance",
    text: "Our abstract was accepted for further development into a full paper for the International Marine Design Conference (IMDC) 2027. We were invited to submit the draft full paper, which has since been submitted.",
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
    accepted: true,
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
    title: "ASME FEDSM 2026 · Presentation",
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
    title: "ASME FEDSM 2026 · Presentation",
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
    date: "2026-06-23",
    accepted: true,
    title: "ASME IMECE 2026 · Two paper acceptances",
    text: "Two papers accepted in the Technical Paper Publication category; both pending publication. The date follows ASME’s scheduled draft-paper decision notification.",
    inlineLinks: [{ text: "scheduled draft-paper decision notification", url: "https://imece.secure-platform.com/a/page/publication_schedule" }],
    papers: [
      {
        title: "Complex Spectral Binding Networks for High-Entropy Fluid Dynamics: Solving the Spectral Fidelity Paradox in Atmospheric Gravity Waves",
        reference: "IMECE2026-192090",
        resources: [
          { label: "ASME paper record", url: "https://imece.secure-platform.com/a/solicitations/281/sessiongallery/24780/application/192090" }
        ]
      },
      {
        title: "A Speed-Gradient Operator for Asymptotic Static State Recovery in Unsteady Viscous Flows",
        reference: "IMECE2026-192091",
        resources: [
          { label: "ASME paper record", url: "https://imece.secure-platform.com/a/solicitations/281/sessiongallery/24781/application/192091" }
        ]
      }
    ]
  },
  {
    date: "2026-11-11",
    title: "ASME IMECE 2026 · Presentations",
    text: "Presented both papers at the Vancouver Convention Centre, Vancouver, Canada. Accepted in the Technical Paper Publication category; pending publication.",
    papers: [
      {
        title: "Complex Spectral Binding Networks for High-Entropy Fluid Dynamics: Solving the Spectral Fidelity Paradox in Atmospheric Gravity Waves",
        reference: "IMECE2026-192090",
        resources: [
          { label: "Presentation slides (PDF)", url: "https://github.com/Henry-Hanyue-Shen/Works_And_Presentations/blob/main/IMECE26/IMECE2026-192090_Presentation.pdf" },
          { label: "Conference session", url: "https://imece.secure-platform.com/a/solicitations/281/sessiongallery/24780" },
          { label: "ASME paper record", url: "https://imece.secure-platform.com/a/solicitations/281/sessiongallery/24780/application/192090" }
        ]
      },
      {
        title: "A Speed-Gradient Operator for Asymptotic Static State Recovery in Unsteady Viscous Flows",
        reference: "IMECE2026-192091",
        resources: [
          { label: "Presentation slides (PDF)", url: "https://github.com/Henry-Hanyue-Shen/Works_And_Presentations/blob/main/IMECE26/IMECE2026-192091_Presentation.pdf" },
          { label: "Conference session", url: "https://imece.secure-platform.com/a/solicitations/281/sessiongallery/24781" },
          { label: "ASME paper record", url: "https://imece.secure-platform.com/a/solicitations/281/sessiongallery/24781/application/192091" }
        ]
      }
    ]
  },
  {
    date: "2026-05-27",
    title: "IEEE OCEANS 2026 Sanya · Presentation and publication",
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
  },

  // Submission milestones. Each date is the venue's official submission deadline.
  {
    date: "2026-10-01",
    title: "IEEE BigData 2026 · CONSTRAINT workshop submission",
    conferenceUrl: "https://lc4workshop.github.io/constraint.html",
    text: "Workshop paper submitted. The date follows the official workshop paper submission deadline.",
    papers: [{ title: "Precision-Preserving Subtensor Inference for a 22B Joint Audio–Video Generator under a Fixed GPU Working Set" }]
  },
  {
    date: "2026-10-01",
    title: "IMDC 2027 · Abstract submission",
    text: "Abstract submitted to the International Marine Design Conference 2027. The date follows the official abstract submission close; IMDC reviews abstracts on a rolling basis.",
    papers: [{ title: "Fixed-Prototype Spatial Voting for Visual Sea-State Classification" }],
    resources: [{ label: "IMDC 2027 key dates", url: "https://sites.mit.edu/imdc" }]
  },
  {
    date: "2026-08-05",
    title: "AGU26 · Abstract submission",
    text: "Abstract submitted to the AGU26 Annual Meeting. The date follows the official abstract submission deadline.",
    papers: [{ title: "Probabilistic Atmospheric Model for Cloud Field Prediction" }]
  },
  {
    date: "2026-05-05",
    title: "ASME IMECE 2026 · Draft paper submission",
    text: "Two full-length draft papers submitted. The date follows ASME’s official draft paper submission deadline.",
    inlineLinks: [{ text: "official draft paper submission deadline", url: "https://imece.secure-platform.com/a/page/publication_schedule" }],
    papers: [
      { title: "Complex Spectral Binding Networks for High-Entropy Fluid Dynamics: Solving the Spectral Fidelity Paradox in Atmospheric Gravity Waves" },
      { title: "A Speed-Gradient Operator for Asymptotic Static State Recovery in Unsteady Viscous Flows" }
    ]
  },
  {
    date: "2026-03-09",
    accepted: true,
    title: "ASME FEDSM 2026 · Two paper acceptances",
    conferenceUrl: "https://event.asme.org/FEDSM-2026",
    text: "Two full-length papers accepted in the Technical Paper Publication category. The date follows ASME’s official paper acceptance notification date.",
    papers: [
      { title: "One Wing for Two Worlds: A Bio-Inspired Design for Cross-Domain Vehicles", reference: "FEDSM2026-184505" },
      { title: "Residual Manifolds and Cloud Uncertainty: A Unified Framework for Physical System Prediction Validated in Aerodynamic Coefficient Prediction", reference: "FEDSM2026-184498" }
    ]
  },
  {
    date: "2026-01-26",
    title: "ASME FEDSM 2026 · Full paper submission",
    conferenceUrl: "https://event.asme.org/FEDSM-2026",
    text: "Two full-length papers submitted for review. The date follows ASME’s official full-length paper submission deadline.",
    papers: [
      { title: "One Wing for Two Worlds: A Bio-Inspired Design for Cross-Domain Vehicles" },
      { title: "Residual Manifolds and Cloud Uncertainty: A Unified Framework for Physical System Prediction Validated in Aerodynamic Coefficient Prediction" }
    ]
  },
  {
    date: "2026-01-12",
    title: "IEEE OCEANS 2026 Sanya · Abstract submission",
    text: "Submitted to IEEE OCEANS 2026 Sanya. The date follows the official abstract submission deadline.",
    inlineLinks: [{ text: "official abstract submission deadline", url: "https://sanya26.oceansconference.org/call-for-abstracts/" }],
    papers: [{ title: "The Critical Maneuverability Theorem: A First-Principles Design Framework for Agile Supercavitating Vehicles" }]
  },
  {
    date: "2025-12-01",
    title: "ASME FEDSM 2026 · Abstract submission",
    conferenceUrl: "https://event.asme.org/FEDSM-2026",
    text: "Two abstracts submitted. The date follows ASME’s official abstract submission deadline.",
    papers: [
      { title: "One Wing for Two Worlds: A Bio-Inspired Design for Cross-Domain Vehicles" },
      { title: "Residual Manifolds and Cloud Uncertainty: A Unified Framework for Physical System Prediction Validated in Aerodynamic Coefficient Prediction" }
    ]
  },

  // Acceptance milestones. Each date is the venue's official notification date.
  {
    date: "2026-02-22",
    accepted: true,
    title: "IEEE OCEANS 2026 Sanya · Acceptance",
    text: "Accepted to IEEE OCEANS 2026 Sanya. The date follows the official author notification date.",
    inlineLinks: [{ text: "official author notification date", url: "https://sanya26.oceansconference.org/call-for-abstracts/" }],
    papers: [{ title: "The Critical Maneuverability Theorem: A First-Principles Design Framework for Agile Supercavitating Vehicles" }]
  },
  {
    date: "2025-12-15",
    accepted: true,
    title: "ASME FEDSM 2026 · Abstract acceptance",
    conferenceUrl: "https://event.asme.org/FEDSM-2026",
    text: "Two abstracts accepted, with invitations to submit full-length papers. The date follows ASME’s official abstract acceptance notification date.",
    papers: [
      { title: "One Wing for Two Worlds: A Bio-Inspired Design for Cross-Domain Vehicles" },
      { title: "Residual Manifolds and Cloud Uncertainty: A Unified Framework for Physical System Prediction Validated in Aerodynamic Coefficient Prediction" }
    ]
  },

  // Scheduled decisions. Official notification dates for papers still under review.
  {
    date: "2026-11-30",
    scheduled: true,
    title: "EMO 2027 · Author notification (scheduled)",
    conferenceUrl: "https://www.emo2027.org/",
    text: "Official author notification date for the EMO 2027 submission. Decision pending."
  },
  {
    date: "2027-02-28",
    scheduled: true,
    title: "MLSys 2027 · Author notification (scheduled)",
    conferenceUrl: "https://mlsys.org/Conferences/2027/Dates",
    text: "Official author notification date for the MLSys 2027 submission. Decision pending.",
    papers: [{ title: "Autoformalization for Ambiguous Inputs: Precision, Coverage, and Cost across SQL and Logical Forms" }]
  }
];

// Experience bars for the overview strip above the Updates carousel.
// short is the row label on the overview strip; end: null means ongoing.
// Dates use YYYY-MM or YYYY-MM-DD.
// Lists experiences active from September 2025 onward (from the resume).
// The overview strip starts at PROFILE_TIMELINE_START (or the first update, if earlier).
window.PROFILE_TIMELINE_START = "2025-09";
window.PROFILE_EXPERIENCE = [
  { short: "MA-498 research", label: "MA-498 Senior Research · Dr. Pavel Dubovski", org: "Stevens Institute of Technology", start: "2026-09", end: null },
  { short: "NE-498 research", label: "NE-498 Naval Engineering Research · Dr. Raju Datla", org: "Stevens Institute of Technology", start: "2026-09", end: null },
  { short: "Neurosymbolic Lab RA", label: "Research Assistant · Dr. William Eiers", org: "Neurosymbolic Software Engineering Laboratory", start: "2026-09", end: null },
  { short: "YH Intelligence", label: "Founder", org: "YH Intelligence Technology, Co., Ltd.", start: "2026-07", end: null },
  { short: "AIRS Fellow", label: "AIRS Fellow · Dr. Jason Rabinovitch", org: "Stevens Institute of Artificial Intelligence", start: "2026-06", end: "2026-08-31" },
  { short: "Electric Boatworks", label: "Unmanned section member", org: "Stevens Electric Boatworks", start: "2025-09", end: null }
];
