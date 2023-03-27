import "./APropos.scss"

export default function APropos() {
    return (
        <div className="main-div" id="a-propos">
            <h1>LaFabriq</h1>
            <p>Notre entreprise existe depuis décembre 2019</p>
            <p>Elle se situe 4 allée Euromédoc, 33160 à Saint-Aubin-de-médoc</p>
            <p>Pour toutes demandes de renseignements, n'hésitez pas à prendre contact avec nous par mail <a href="mailto:contact@la-fabriq.com">contact@la-fabriq.com</a> ou bien à nous appeler au <a href="tel:0698590869">06 98 59 08 69</a>.</p>
            <h2>Propriété  Intellectuelle</h2>
            <p>L'accès au site {document.location.host} vous confère un droit d’usage privé et non exclusif sur ce site.</p>
            <p>L'ensemble des éléments édités sur ce site, incluant notamment les textes, photographies, infographies, logos, marques, etc... constituent des œuvres au sens du Code de la Propriété Intellectuelle.</p>

            <p>En conséquence, toute modification, représentation ou reproduction, copie, traduction, intégrale ou partielle est strictement interdite.</p>

            <p>De manière générale, {document.location.host} ne saurait être tenue pour responsable de tout dommage, direct ou indirect, résultant de l’utilisation interdite des informations ou de tout autre élément, délivrés sur notre site</p>

            <h2>Respect de la vie privée</h2>
            <p>La société LA FABRIQ vous informe que toutes les données nominatives collectées sur le site {document.location.host} lui sont exclusivement destinées.</p>

            <p>Conformément à la Loi du 6 Janvier 1978, « Informatique et Libertés », vous disposez d’un droit d’accès, de rectification aux données personnelles vous concernant. Pour exercer ce droit, il vous suffit d’écrire soit par e-mail à <a href="mailto:contact@la-fabriq.com">contact@la-fabriq.com</a> soit par voie postale à l’adresse suivante : LA FABRIQ - 4 Allée Euromédoc - 33160 Saint Aubin de Médoc</p>

            <h2>Liens depuis ou vers ce site</h2>
            <p>Le site {document.location.host} est susceptible de proposer des liens vers des sites tiers. La société ne pourra être tenue responsable  du contenu de ces sites et de l’usage qui pourra en être fait par les utilisateurs. Les utilisateurs et visiteurs du site {document.location.host} ne peuvent mettre en place un hyperlien en direction de ce site sans l’autorisation expresse et préalable de la société.</p>

            <h2>Utilisation de cookies</h2>
            <p>Le site {document.location.host} utilise des cookies. Ces fichiers stockés sur votre ordinateur nous servent à faciliter votre accès aux services que nous proposons. Les cookies du site ne contiennent pas de données permettant de vous identifier personnellement. Nous vous informons que vous pouvez vous opposez à l’enregistrement de ces cookies en configurant votre ordinateur selon les modalités détaillées sur le site <a href="http://www.cnil.fr">http://www.cnil.fr</a></p>


            <h2>Indisponibilité du site {document.location.host}</h2>
            <p>La société LA FABRIQ s’engage à mettre en œuvre tous les efforts pour assurer aux utilisateurs une accessibilité du site à tout moment. Elle ne pourra être tenue responsable, en cas d’indisponibilité du site, pour quelque raison que ce soit.</p>


            <h2>Droit applicable</h2>
            <p>Le présent site est soumis au droit français.</p>
        </div >
    )
}