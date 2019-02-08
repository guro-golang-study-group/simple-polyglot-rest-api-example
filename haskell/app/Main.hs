{-# LANGUAGE OverloadedStrings #-}
module Main where

import Network.Wai
import Network.HTTP.Types
import Network.Wai.Handler.Warp (run)
import Data.Binary.Builder (putStringUtf8)
import Data.Text (Text, unpack)
import Data.ByteString (ByteString)

notFound :: Response
notFound = responseLBS
    status404
    [("Content-Type", "text/plain")]
    "404 - Not Found"

loggingMiddleware :: Middleware
loggingMiddleware next req res = do
    putStrLn "logging..."
    next req res

helloWorldHandler :: Text -> Application
helloWorldHandler name req res = case requestMethod req of 
    "GET" -> res $ responseBuilder
        status200
        [("Content-Type", "text/plain")]
        (putStringUtf8 $ "Hello " <> (unpack name))
    "POST" -> res notFound
    
app :: Application
app req res = case pathInfo req of
    ("hello" : name : _) -> loggingMiddleware (helloWorldHandler name) req res
    _ -> res notFound

main :: IO ()
main = do
    putStrLn $ "http://localhost:9000/"
    run 9000 app
