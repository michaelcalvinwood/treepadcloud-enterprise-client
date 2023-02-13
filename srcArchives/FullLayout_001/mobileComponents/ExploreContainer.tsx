import './ExploreContainer.css';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <div className="container">
      <h1 style={ {textAlign: "center"} }>Hello Mobile</h1>
    </div>
  );
};

export default ExploreContainer;
