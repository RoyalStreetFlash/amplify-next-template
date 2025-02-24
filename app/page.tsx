"use client";  // このファイルがクライアントサイド専用であることを示す

import { useState, useEffect } from "react";  // ReactのuseStateとuseEffectをインポート
import { Amplify } from "aws-amplify";  // Amplify本体をインポート
import outputs from "@/amplify_outputs.json";  // Amplifyの設定出力ファイルをインポート
import { Authenticator } from "@aws-amplify/ui-react";  // Authenticatorコンポーネントをインポート
import "@aws-amplify/ui-react/styles.css";  // Amplify UIのスタイルをインポート

// Amplifyを設定ファイル（outputs）で構成
Amplify.configure(outputs);

export default function App() {
  // ユーザー名と検索ワードを状態として管理する
  const [username, setUsername] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // サインインしているユーザー情報を取得
  const handleSignIn = (user: any) => {
    console.log("Logged in as:", user?.signInDetails?.loginId);
  };

  // ユーザー名の入力を処理する関数
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  // 検索ワードの入力を処理する関数
  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    // Authenticatorコンポーネントで、ユーザー認証をラップ
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          {/* ユーザー情報の表示 */}
          <h1>{user?.signInDetails?.loginId}'s search</h1>
          
          {/* ユーザー名の入力フォーム */}
          <div>
            <label htmlFor="username">X's Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter username"
            />
          </div>

          {/* 検索ワードの入力フォーム */}
          <div>
            <label htmlFor="searchQuery">Search Query:</label>
            <input
              id="searchQuery"
              type="text"
              value={searchQuery}
              onChange={handleSearchQueryChange}
              placeholder="Enter search query"
            />
          </div>

          {/* 検索実行ボタン */}
          <div>
            <button onClick={() => alert(`Searching for "${searchQuery}" by "${username}"`)}>Search</button>
          </div>

          {/* サインアウトボタン */}
          <div>
            <button onClick={signOut}>Sign out</button>
          </div>
        </main>
      )}
    </Authenticator>
  );
}
