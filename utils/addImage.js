export const addImage = (e, setSelectedFileState) => {
  const reader = new FileReader();
  if (e.target.files[0]) {
    reader.readAsDataURL(e.target.files[0]);
  }

  reader.onload = (readerEvent) => {
    setSelectedFileState(readerEvent.target.result);
  };
};
