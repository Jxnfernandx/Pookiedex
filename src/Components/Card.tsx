const Card = ({ image }) => {
    return (
        <>
            <div className="card">
                <img className="card-img" src={image} />
            </div>
        </>
    );
};

export default Card;