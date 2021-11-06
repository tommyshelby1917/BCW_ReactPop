import React, { useState, useEffect, useCallback } from 'react';
import { requestTagsToAPI } from '../service';
import styled from 'styled-components';

const GetTags = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const tags = await requestTagsToAPI();
      setData(tags);
    }
    fetchData();
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
      {/* <select name="tags" multiple> */}
      {collectedTags.map((e) => (
        <button type="button" key={e.toString()} onClick={click}>
          {e}
        </button>
        // <option key={e.toString()} value={e} onClick={}>
        //   {e}
        // </option>
      ))}
      {/* </select> */}
    </div>
  );
}

export default SelectTags;
