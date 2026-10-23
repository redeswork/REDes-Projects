import { truncateText } from "./truncateText"


export function BookItem(
    {title, author, published, coverUrl, bookUrl}:
    {title: string, author: string, published: number, coverUrl: string | null, bookUrl: string}
) {


    return (

        <div className="content-card hover" style={{gap: "0.5rem", justifyContent: "auto", backgroundColor:"#e3e3e3"}}>

            <div style={{gap: "1rem"}}>
                <div>

                    <h3 style={{fontSize:"var(--text-H5)"}}>{truncateText(title, 12)}</h3>
                
                </div>

                <div style={{width: "100%", aspectRatio:"3/4", paddingTop: "1rem", paddingBottom: "0.5rem", display: "flex", flexDirection:"column", justifyContent:"center", alignContent: "center"}}>
                    { coverUrl ? (
                        <img src={coverUrl} alt={`${title} cover`} style={{width: "100%", aspectRatio:"3/4"}}></img>
                    ) : (
                        <p style={{color:"#ababab"}}>Cover Not Found</p>
                    )
                }
                </div>
            </div>
            
            <div>
                <p style={{fontSize: "var(--text-P)"}}>{author}</p>
                <p style={{fontSize: "var(--text-P)"}}>{published}</p>
                <a href={bookUrl} target="_blank">
                    <button style={{width:"100%", marginTop:"1rem"}}>View Book</button>

                </a>
            </div>

        </div>
    )
}