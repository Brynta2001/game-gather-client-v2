import GameCard from '@/components/games/GameCard';

const Dashboard: React.FC = () => {   

    return (
        
        <GameCard
            key={1}
            id="1"
            title="The Legend of Zelda: Breath of the Wild"
            publisher="Nintendo"
            releaseYear={2017}
            genres={["Action", "Adventure"]}
            platforms={["Nintendo Switch", "Wii U"]}
            image="https://assets-prd.ignimgs.com/2022/06/14/zelda-breath-of-the-wild-1655249167687.jpg"
        />       

    );
};

export default Dashboard;
