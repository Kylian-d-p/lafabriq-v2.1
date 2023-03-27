import "./Card.scss"
import ContentLoader from "react-content-loader"

export default function CardSkeleton() {
    return (
        <div className="card">
            <div className="card-picture-container">
                <div className="card-picture"></div>
            </div>
            <div>
                <p className="card-title">
                    <ContentLoader
                        speed={2}
                        width={200}
                        height={36}
                        viewBox="0 0 200 36"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <rect x="0" y="0" rx="5" ry="5" width="200" height="36" />
                    </ContentLoader></p>
                <p className="card-legend">
                    <ContentLoader
                        speed={2}
                        width={200}
                        height={19}
                        viewBox="0 0 200 19"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <rect x="0" y="0" rx="5" ry="5" width="200" height="19" />
                    </ContentLoader></p>
                <p className="card-price">
                    <ContentLoader
                        speed={2}
                        width={200}
                        height={30}
                        viewBox="0 0 200 30"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <rect x="0" y="0" rx="5" ry="5" width="200" height="30" />
                    </ContentLoader></p>
            </div>
            <div className="view-product-container">
                <div className="view-product">
                    <ContentLoader
                        speed={2}
                        width={200}
                        height={30}
                        viewBox="0 0 200 30"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <rect x="0" y="0" rx="5" ry="5" width="200" height="30" />
                    </ContentLoader></div>
            </div>
        </div>
    )
}