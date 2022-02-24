import React from 'react';
import TextareaForm from 'components/Forms/Textarea';

export default { title: 'Forms/TextareaForm' };

export const normal = (): JSX.Element => <TextareaForm id="title" name="Title" required={false} />;
export const isRequired = (): JSX.Element => (
  <TextareaForm id="title" name="Title" required={true} />
);
