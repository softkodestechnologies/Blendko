import ExploreSideBar from '../../components/aside/ExploreSideBar';
// import { GetServerSideProps } from 'next';
// import { checkAuth } from '../../lib/auth';

export default function About() {
    return (
      <section>
      <header>
        <h1>About Us</h1>
        <hr />
      </header>
      <div>

        <ExploreSideBar />

        <div>
         <h2>Contact</h2>
        </div>
      </div>
    </section>
    )
}

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//     return checkAuth(ctx)
// }