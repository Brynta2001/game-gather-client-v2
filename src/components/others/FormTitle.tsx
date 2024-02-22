import React from 'react';

interface FormTitleProps {
    title: string;
}
// FormTitle component displays a title for a form.
const FormTitle: React.FC<FormTitleProps> = ({ title }) => {
    return <div><h1 className="text-2xl font-bold mb-4 justify-center items-center text-center"><div>{title}</div></h1></div>
    ;
};

export default FormTitle;