import React from 'react';
import { View } from 'react-native';
import HTMLView from 'react-native-htmlview';
import CustomImage from './CustomImage';


const customRenderer = (node, index, siblings, parent, defaultRenderer) => {
  if (node.name === 'img') {
    const src = node.attribs.src;
    return <CustomImage key={index} source={src} />;
  }
};

const RichTextRenderer = ({content}) => {
  return (
    <View style={{marginTop: 40}}>
      <HTMLView
        value={"<div>"+content+"</div>"}
        stylesheet={styles}
        renderNode={customRenderer}
      />
    </View>
  );
};

const styles = {
    p: {
        fontSize: 16,
        lineHeight: 26,
        color: '#262626',
        marginVertical: 15,
      },
};
export default RichTextRenderer;