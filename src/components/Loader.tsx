import React from 'react';

import { ClipLoader } from 'react-spinners';

interface LoaderProps {
  loading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ loading }) => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <ClipLoader color="#4A90E2" loading={loading} size={35} />
    </div>
  );
};

export default Loader;
