import React, { useState, useEffect } from "react";
import { Candidate } from "../components/Candidate.interface";
import styles from "../pages/SavedCandidates.module.css"; // Import CSS module

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Load candidates from localStorage when the page loads
  useEffect(() => {
    const storedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    setSavedCandidates(storedCandidates);
  }, []);

  // Remove a candidate from the list
  const removeCandidate = (login: string) => {
    const updatedCandidates = savedCandidates.filter((c) => c.login !== login);
    setSavedCandidates(updatedCandidates);

    // Update localStorage
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
  };

  return (
    <div className={styles.container}>
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No candidates have been accepted.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Company</th>
              <th>Bio</th>
              <th>GitHub</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.slice(0, 4).map((candidate, index) => (
              <tr key={index}>
                <td>
                  <img src={candidate.avatar_url} alt="Avatar" />
                </td>
                <td>{candidate.name || "N/A"}</td>
                <td>{candidate.location || "N/A"}</td>
                <td>{candidate.company || "N/A"}</td>
                <td>{candidate.bio || "N/A"}</td>
                <td>
                  <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                    View Profile
                  </a>
                </td>
                <td>
                  <button className={styles.rejectBtn} onClick={() => removeCandidate(candidate.login)}>-
            
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCandidates;
