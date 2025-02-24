"use client";  // このファイルがクライアントサイド専用であることを示す

import { useState, useEffect } from "react";  // ReactのuseStateとuseEffectをインポート
import { Amplify } from "aws-amplify";  // Amplify本体をインポート
import outputs from "@/amplify_outputs.json";  // Amplifyの設定出力ファイルをインポート
import { Authenticator } from "@aws-amplify/ui-react";  // Authenticatorコンポーネントをインポート
import "@aws-amplify/ui-react/styles.css";  // Amplify UIのスタイルをインポート
import './App2.css'; // 独自のCSSをインポートしてスタイリングを改善

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
        <main className="container">
          {/* ユーザー情報の表示 */}
          <h1 className="header">ログイン: {user?.signInDetails?.loginId}</h1>

          {/* ユーザー名の入力フォーム */}
          <div className="form-group">
            <label htmlFor="username">検索ユーザ</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter username"
              className="input-field"
            />
          </div>

          {/* 検索ワードの入力フォーム */}
          <div className="form-group">
            <label htmlFor="searchQuery">検索ワード</label>
            <input
              id="searchQuery"
              type="text"
              value={searchQuery}
              onChange={handleSearchQueryChange}
              placeholder="Enter search query"
              className="input-field"
            />
          </div>

          {/* 検索実行ボタン */}
          <div className="button-container">
            <button
              className="button"
              onClick={() => alert(`Searching for "${searchQuery}" by "${username}"`)}
            >
              Search
            </button>
          </div>

          {/* サインアウトボタン */}
          <div className="button-container">
            <button className="button" onClick={signOut}>
              Sign out
            </button>
          </div>
        </main>
      )}
    </Authenticator>
  );
}
