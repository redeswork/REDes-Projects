


export function BookItem(
    {title, author, published, coverUrl}:
    {title: string, author: string, published: number, coverUrl: string | null}
) {


    return (

        <div className="content-card hover" style={{gap: "0.5rem", justifyContent: "auto", backgroundColor:"#e3e3e3"}}>

            <div style={{gap: "1rem"}}>
                <div>

                    <h3 style={{fontSize:"var(--text-H4)"}}>{title}</h3>
                
                </div>

                <div style={{width: "100%", aspectRatio:"3/4", paddingTop: "1rem", paddingBottom: "0.5rem", display: "flex", flexDirection:"column", justifyContent:"center", alignContent: "center"}}>
                    { coverUrl ? (
                        <img src={coverUrl} alt={`${title} cover`} style={{width: "100%", aspectRatio:"3/4"}}></img>
                    ) : (
                        <p>Cover Not Found</p>
                    )
                }
                </div>
            </div>
            
            <div>
                <p>{author}</p>
                <p>Year Published: {published}</p>
            </div>

        </div>
    )
}