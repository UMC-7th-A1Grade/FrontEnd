import { useState } from "react";
import StorageButton from "../components/storagePage/StorageButton.jsx";
import StorageImages from "../components/storagePage/StorageImages.jsx";

export default function StoragePage() {
  const [filter, setFilter] = useState({ type: null, isOverLimit: false }); // 버튼 상태 관리

  return (
    <>
      <StorageButton setFilter={setFilter} />
      <StorageImages filter={filter} />
    </>
  );
}
