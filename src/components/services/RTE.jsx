import QuillEditor from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Controller } from 'react-hook-form';

function RTE({ control, name, defaultValue = '' }) {
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline'],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'font',
    'list',
    'bullet',
    'bold',
    'italic',
    'underline',
    'color',
    'background',
    'align',
    'link',
    'image',
  ];
  return (
    <div
      className="
    w-full mt-4
    "
    >
      <Controller
        name={name || 'content'}
        control={control}
        render={({ field }) => (
          <QuillEditor
            {...field}
            onChange={(value) => field.onChange(value)}
            value={field.value || defaultValue}
            theme="snow"
            className="w-full h-[60vh] "
            modules={modules}
            formats={formats}
          />
        )}
      ></Controller>
    </div>
  );
}

export default RTE;
