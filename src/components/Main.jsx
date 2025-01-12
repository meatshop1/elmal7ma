import ItemCard from './ItemCard'

const items = [
  {
    id: 1,
    url: 'https://www.shutterstock.com/image-photo/variety-raw-beef-meat-prime-260nw-2496493565.jpg',
    name: 'Item 1',
    price: 100,
    description: 'Description 1'
  }
]

const Main = () => {
  return (
    <main>
        <div className='m-auto'>
            {items.map(item => (
                <ItemCard key={item.id} url={item.url} name={item.name} description={item.description} price={item.price} />
            ))}
        </div>
    </main>
  )
}

export default Main