import * as React from "react";
import Article from "./Article";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import ArticleByDifficultyComponent from "./ArticleByDifficultyComponent";

export class ArticleHighlightsProps {
  id: string;
}

const ArticleHighlightsComponent: React.FC<ArticleHighlightsProps> = ({ id } :ArticleHighlightsProps) => {
  const [data, setData] = useState<Article>(new Article());
  const [loading, setLoading] = useState<boolean>(true);
  const [stopFetching, setStopFetching] = useState<boolean>(false);
  const url = `http://localhost:8080/status/${id}`;

  const checkCondition = (data: Article): boolean => {
    return !!!data.status && data.text.length>0;
  };

  useEffect(() => {
    const fetchData = async (attempt: number = 0) => {
      if (stopFetching) return; // Stop the fetching process if the condition is met

      try {
        const response = await axios.get<Article>(url)
        if (!response.status) {
          throw new Error('Network response was not ok');
        }

        // Check if the fetched data contains the value you're looking for
        if (checkCondition(response.data)) { // Replace `someCondition` with your actual condition
          setStopFetching(true); // Update the state to stop further fetching
          setData(response.data);
          setLoading(false);
        } else {
          const delay = Math.pow(2, attempt) * 1000;
          setTimeout(() => fetchData(Math.min(attempt+1, 5)), delay);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, [stopFetching]);

  useEffect(() => {
    setStopFetching(false);
  }, [id])

  if (loading) {
    return <Spinner/>;
  }

  return <ArticleByDifficultyComponent text={data.text} novice={data.novice} expert={data.expert} intermediate={data.intermediate} textV2={data.textV2}/>;
};

export default ArticleHighlightsComponent;
