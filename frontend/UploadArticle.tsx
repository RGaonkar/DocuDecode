import { useState } from 'react';
import ArticleHighlightsComponent from './ArticleHighlightsComponent';
import ArticleDragAndDrop from './ArticleDragAndDrop';

interface ArticleUploadProps {
    uploadEndpoint: string;
  }

function ArticleUpload({ uploadEndpoint }: ArticleUploadProps) {
  const [Id, setId] = useState<string>();

  const onGenerating = (id: string) => {
    setId(id);
  };

  return (
    <>
      {!!!Id && <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', justifyContent: 'center'}}>
        <ArticleDragAndDrop uploadEndpoint={uploadEndpoint} onGenerating={onGenerating}/>
      </div>}
      {Id && <ArticleHighlightsComponent id={Id}/>}
    </>
  );
}

export default ArticleUpload;
