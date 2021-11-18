import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';

import 'codemirror/theme/material.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/elegant.css';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/css/css';
import 'codemirror/mode/php/php';
import 'codemirror/mode/xml/xml';

const CodeField = ({ roomId, fontSize, socket, options }) => {
  const [code, setCode] = React.useState('const greetings = "Hello World!"');

  React.useEffect(() => {
    getText();
  }, [code]);

  const sendText = (text) => {
    socket.emit('sendText', { roomId, text });
  };

  const getText = () => {
    socket.on('getText', (text) => {
      setCode(text);
    });
  };

  const changeHandler = (value) => {
    setCode(value);
  };

  return (
    <div style={{ fontSize: fontSize }} className="code">
      <CodeMirror
        value={code}
        options={options}
        onBeforeChange={(editor, date, value) => {
          changeHandler(value);
          sendText(value);
        }}
      />
    </div>
  );
};

export default CodeField;
