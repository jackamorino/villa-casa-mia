import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { PageHero } from '@/components/PageHero';
import { guides } from '@/lib/guides';
import { photos } from '@/lib/photos';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata({title:'Cosa fare ad Arquà Petrarca e nei Colli Euganei',path:'/explore',description:'Idee per il tuo soggiorno ad Arquà Petrarca: il borgo, i sentieri dei Colli Euganei, il Giardino di Valsanzibio e Monselice. Guide pratiche con fonti ufficiali.'});
export default function ExplorePage(){return <><Nav solid/><JsonLd data={breadcrumbJsonLd([{name:'Home',path:'/'},{name:'I dintorni',path:'/explore'}])}/><main id="main"><PageHero eyebrow="La guida di Villa Casa Mia" title={<>Qui intorno,<br/><em>un mondo da vivere.</em></>} intro="Cosa fare ad Arquà Petrarca e nei Colli Euganei? Parti da quello che ti piace: un borgo da conoscere, un sentiero, un giardino. Queste guide ti aiutano a costruire la tua giornata." image={photos.sunset.src} alt={photos.sunset.alt}/><div className="explore-main wrap"><div className="guide-grid explore-grid">{guides.map((g,i)=><Link className={`guide-tile guide-tone-${i%3}`} key={g.slug} href={`/explore/${g.slug}`}><span className="guide-index">0{i+1} / {g.category}</span><div><h2>{g.title}</h2><p>{g.short}</p><span className="round-arrow">↗</span></div></Link>)}</div><section className="guide-note"><h2>Un weekend, senza riempire ogni minuto.</h2><p>Un giorno per Arquà Petrarca e un giorno per i dintorni: scegli una passeggiata sui Colli, una visita a Valsanzibio o una tappa a Monselice. Lascia spazio anche a una pausa.</p><Link href="/rooms" className="under-link">Soggiorna a Villa Casa Mia ↗</Link></section></div></main><Footer/></>}
