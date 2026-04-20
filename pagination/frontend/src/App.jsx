import { useEffect, useState } from "react";

function App() {
  // 🔹 Store data coming from backend
  const [images, setImages] = useState([]);

  // 🔹 Track current page
  const [page, setPage] = useState(1);

  // 🔹 Total pages (from backend)
  const [totalPages, setTotalPages] = useState(1);

  // 🔹 Loading state (optional but good practice)
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch data whenever page changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 🔥 API Call (your backend pagination API)
        const res = await fetch(
          `http://localhost:3000/api/files/images?page=${page}&limit=10`
        );

        const data = await res.json();

        // 🔹 Store data
        setImages(data.data);
        console.log('====================================');
        console.log(data.data);
        console.log('====================================');
        // 🔹 Store total pages
        setTotalPages(data.totalPages);

      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]); // 🔥 runs when page changes

  return (
    <div style={{ padding: "20px" }}>
      <h2>Paginated Images</h2>

      {/* 🔹 Loading State */}
      {loading && <p>Loading...</p>}

      {/* 🔹 Display Images */}
      <div style={{display:"flex" ,alignItems:"center",justifyContent:"center" ,flexWrap:"wrap"}}>
        {images.map((item) => (
          <div key={item._id} style={{ marginBottom: "10px",flexShrink:"0" }}>
            {/* Change based on your schema */}
            <p>{item.name || "Image Item"}</p>
            <iframe src={item.imageKitUrl} frameborder="0"></iframe>
          </div>
        ))}
      </div>

      {/* 🔹 Pagination Controls */}
      <div style={{ marginTop: "20px" }}>
        
        {/* 🔸 Previous Button */}
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>

        {/* 🔸 Page Info */}
        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>

        {/* 🔸 Next Button */}
        <button
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>

      </div>
    </div>
  );
}

export default App;