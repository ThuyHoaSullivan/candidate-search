import React, { useState, useEffect } from "react";
import { Candidate } from "../components/Candidate.interface";
import styles from "../pages/CandidateSearch.module.css";

const CandidateSearch: React.FC = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [candidatesList, setCandidatesList] = useState<Candidate[]>([]);
  const [error, setError] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const usernames = ["octocat", "torvalds", "mojombo", "gaearon", "addyosmani", "tj", "sindresorhus", "yyx990803"]; // Example usernames

  const fetchNextCandidate = async () => {
    if (currentIndex >= usernames.length) return;
  
    try {
      setError("");
      const response = await fetch(`https://api.github.com/users/${usernames[currentIndex]}`);
      if (!response.ok) throw new Error("User not found or API request failed");
  
      const data = await response.json();
      setCandidate({
        name: data.name || "No Name",
        login: data.login,
        location: data.location || "Location not provided",
        avatar_url: data.avatar_url,
        email: data.email || "Email not available",
        html_url: data.html_url,
        company: data.company || "Company not available",
        bio: data.bio || "No bio available", // ✅ Added bio property
      });
    } catch (err: any) {
      setError("Error fetching candidate: " + err.message);
    }
  };

  useEffect(() => {
    fetchNextCandidate();
  }, [currentIndex]);

  const saveCandidate = () => {
    if (candidate && !candidatesList.some((c) => c.login === candidate.login)) {
      const updatedList = [...candidatesList, candidate];
      setCandidatesList(updatedList);
  
      // Store in localStorage
      localStorage.setItem("savedCandidates", JSON.stringify(updatedList));
    }
    setCurrentIndex((prev) => prev + 1);
  };
  

  const skipCandidate = () => setCurrentIndex((prev) => prev + 1);

  return (
    <div>
      <h2>Candidate Search</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {currentIndex >= usernames.length ? (
        <p>No more candidates to review</p>
      ) : (
        candidate && 
        
        (

          <div className={styles.candidateBox}>
            <div className={styles.section}>
              <img src={candidate.avatar_url} alt="Avatar" />
            </div>
            <div className={styles.section}>
              <p>Username: {candidate.login}</p>
              <p>Location: {candidate.location}</p>
              <p>Email: {candidate.email}</p>
              <p>Company: {candidate.company}</p>
              <p>Bio: {candidate.bio}</p>
            </div>
            <div className={styles.buttonBox}>
              <button className={styles.plus} onClick={saveCandidate}>+</button>
              <button className={styles.minus} onClick={skipCandidate}>-</button>
            </div>
            
          </div>

          // <div className={styles.candidateBox}>
          //   <div className={styles.avatarBox}>
          //     <img src={candidate.avatar_url} alt={candidate.name} />
          //   </div>
          //   <div className={styles.detailsBox}>
          //     <h3>{candidate.name}</h3>
          //     <p>Username: {candidate.login}</p>
          //     <p>Location: {candidate.location}</p>
          //     <p>Email: {candidate.email}</p>
          //     <p>Company: {candidate.company}</p>
          //     <p>Bio: {candidate.bio}</p>
          //     <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
          //       View Profile
          //     </a>
          //   </div>
          //   <div className={styles.buttonBox}>
          //     <button onClick={saveCandidate}>+</button>
          //     <button onClick={skipCandidate}>-</button>
          //   </div>
          // </div>
          )
      )}
      <h3>Saved Candidates</h3>
      <ul>
        {candidatesList.map((c, index) => (
          <li key={index}>{c.name} ({c.login})</li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateSearch;
