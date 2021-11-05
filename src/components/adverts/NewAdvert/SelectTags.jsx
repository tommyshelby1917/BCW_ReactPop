import React, { useState, useEffect, useCallback } from 'react';
import { requestTagsToAPI } from '../service';
import styled from 'styled-components';

const GetTags = () => {
  const [data, setData] = useState([]);

  useEffect(async () => {
    const tags = await requestTagsToAPI();
    setData(tags);
  }, []);

  return data;
};

const CallData = () => {
  const tags = GetTags();
  return tags;
};

function SelectTags({ click }) {
  const collectedTags = CallData();

  return (
    <div>
      {collectedTags.map((e) => (
        <button key={e.toString()} onClick={click}>
          {e}
        </button>
      ))}
    </div>
  );
}

export default SelectTags;
