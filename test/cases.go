package main

import (
	"encoding/hex"
	"fmt"
	"os"

	"github.com/status-im/status-go/eth-node/crypto"
	"github.com/status-im/status-go/protocol/identity/alias"
)

type Pair struct {
	publicKey string
	chatName  string
}

func genPubKeyAndName() (*Pair, error) {
	privateKey, err := crypto.GenerateKey()
	if err != nil {
		return nil, err
	}
	publicKey := hex.EncodeToString(crypto.FromECDSAPub(&privateKey.PublicKey))
	chatName := alias.GenerateFromPublicKey(&privateKey.PublicKey)
	return &Pair{publicKey, chatName}, nil
}

/* Just run this file using `go run cases.go` */
func main() {
	for i := 0; i < 9; i++ {
		pair, err := genPubKeyAndName()
		if err != nil {
			fmt.Println(err)
			os.Exit(1)
		}
		fmt.Printf(
			"{\"name\":\"%s\", \"key\":\"%s\"}\n",
			pair.chatName, pair.publicKey)
	}
}
