import React from 'react';
import HTMLView from 'react-native-htmlview';

const customStyles = {
  p: {
    fontSize: 14,
    lineHeight: 26,
    color: '#262626',
    marginVertical: 15,
  },
};

function First200WordsHTMLView({ htmlContent }) {
  const extractFirst200Words = (htmlString) => {
    // Strip HTML tags and decode HTML entities
    const strippedText = htmlString.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');

    // Split the text into words
    const words = strippedText.split(' ');

    // Select the first 200 words or less
    const first200Words = words.slice(0, 50).join(' ');

    return first200Words;
  };

  const first200Words = extractFirst200Words(htmlContent);

  return (
    <HTMLView
      value={`<p>${first200Words} <span class="seeMoreButton">....</span></p>`}
      stylesheet={customStyles}
    />
  );
}

export default First200WordsHTMLView;


