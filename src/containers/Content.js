import React from 'react';
import Button from '../components/Button';
import Title from '../components/Title';
import Description from '../components/Description';
import ContentPreview from '../components/ContentPreview';

export const Content = ({id, onClick, translate, locale, preview}) => {
    const {title, description, button} = translate(id, locale);
    console.info('...', 'ContentBuilder', {title, description, button});
    return (
        <div className="ts-content-element">
            <div className="ts-content-preview-wrapper">
                {ContentPreview({preview})}
            </div>
            {Title({title})}
            {Description({description})}
        </div>
    );
};

// export const Content = ({id, onClick, translate, locale, preview}) => {
//     const {title, description, button} = translate(id, locale);
//     console.info('...', 'ContentBuilder', {title, description, button});
//     return (
//         <div className="ts-content-element">
//             <div className="ts-content-preview-wrapper">
//                 {ContentPreview({preview})}
//             </div>
//             <Title title={title}/>
//             <Description description={description}/>
//             <div className="ts-content-button-wrapper">
//                 <Button value={id} onClick={onClick} text={button}/>
//             </div>
//         </div>
//     );
// };

export default Content;