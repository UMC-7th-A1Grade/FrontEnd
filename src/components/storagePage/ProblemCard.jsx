import { useState, useEffect } from "react";
import imageSrc from "../../assets/images/storagePage/image.png";
import styles from "../../styles/storagePage/problemCard.module.css";

export default function ProblemCard() {
    const [images, setImages] = useState(Array(10).fill(imageSrc)); // 초기 더미 데이터

    // 무한 스크롤용 핸들러
    const loadMoreImages = () => {
        // 새로운 더미 데이터 추가
        setImages((prevImages) => [...prevImages, ...Array(10).fill(imageSrc)]);
    };

    // Intersection Observer 설정
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { //관찰중인 요소 배열
                if (entry.isIntersecting) { //뷰포트에 들어오면 true
                    loadMoreImages(); // 마지막 요소가 보이면 데이터 추가
                }
            },
            { threshold: 1.0 } //요소가 100% 뷰포트에 들어왔을 때만 콜백 실행
        );

        const sentinel = document.getElementById("sentinel"); // 무한 스크롤의 트리거
        if (sentinel) observer.observe(sentinel);  //관찰시작

        return () => {
            if (sentinel) observer.unobserve(sentinel); //관찰중지
        };
    }, []);

    return (
        <div className={styles.gridContainer}>
            {images.map((src, index) => (
                <img key={index} src={src} alt={`Image ${index}`} className={styles.image} />
            ))}
            <div id="sentinel" className={styles.sentinel}></div>
        </div>
    );
}
