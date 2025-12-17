(define-constant CONTRACT-OWNER tx-sender)
(define-constant ERR-UNAUTHORIZED (err u401))
(define-constant ERR-ALREADY-VOTED (err u403))

(define-map Proposals 
    { proposal-id: uint } 
    { title: (string-ascii 50), votes-for: uint, status: (string-ascii 10) }
)

(define-map Votes { proposal-id: uint, voter: principal } { voted: bool })

(define-data-var proposal-count uint u0)

(define-public (create-proposal (title (string-ascii 50)))
    (let ((id (+ (var-get proposal-count) u1)))
        (map-set Proposals { proposal-id: id } { title: title, votes-for: u0, status: "active" })
        (var-set proposal-count id)
        (print { event: "proposal-created", id: id, title: title, creator: tx-sender })
        (ok id)
    )
)

(define-public (vote-for (id uint))
    (let ((proposal (unwrap! (map-get? Proposals { proposal-id: id }) (err u404))))
        (asserts! (is-none (map-get? Votes { proposal-id: id, voter: tx-sender })) ERR-ALREADY-VOTED)
        (map-set Votes { proposal-id: id, voter: tx-sender } { voted: true })
        (map-set Proposals { proposal-id: id } 
            (merge proposal { votes-for: (+ (get votes-for proposal) u1) })
        )
        (print { event: "vote-cast", id: id, voter: tx-sender, current-total: (+ (get votes-for proposal) u1) })
        (ok true)
    )
)

(define-read-only (get-proposal (id uint))
    (map-get? Proposals { proposal-id: id })
)
