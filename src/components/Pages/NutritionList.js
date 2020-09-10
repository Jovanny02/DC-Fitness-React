import React from 'react';

const NutritionList = props => {
  let ArticleList = props.articles;
  let NutritionList;

  if (ArticleList !== null) {
    NutritionList = ArticleList.map(article => {
      return (
        <ul
          key={article.video}
          onClick={() => props.clickHandler(article)}
          className='Article'
        >
          {article.title}
        </ul>
      );
    });
  }

  return <div>{NutritionList}</div>;
};
export default NutritionList;
