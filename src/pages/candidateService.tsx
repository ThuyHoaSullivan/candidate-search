import { Candidate } from "../components/Candidate.interface";

export const saveCandidate = (candidate: Candidate) => {
  const existingCandidates: Candidate[] = JSON.parse(localStorage.getItem("savedCandidates") || "[]");

  // Prevent duplicates
  if (!existingCandidates.some(c => c.login === candidate.login)) {
    existingCandidates.push(candidate);
    localStorage.setItem("savedCandidates", JSON.stringify(existingCandidates));
    console.log("Saved candidate:", candidate);
  } else {
    console.log("Candidate already saved:", candidate);
  }
};