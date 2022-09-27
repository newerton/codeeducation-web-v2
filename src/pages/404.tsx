import Link from 'next/link';

function Custom404() {
  return (
    <>
      <div>
        <div>Ops! Página não encontrada.</div>
        <Link href="/">
          <a>Voltar</a>
        </Link>
      </div>
    </>
  );
}

export default Custom404;
